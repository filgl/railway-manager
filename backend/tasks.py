import os
import shutil
import subprocess
from pathlib import Path

from invoke import task

# Invoke main command:
#
# - invoke setup (default configuration for prod)
# - invoke setup-devel
# - invoke replace-secret-key
# - invoke create-env-files
# - invoke create-symlinks
#
# VARIABLES: env, requirements_type
#
# if you want to change the variables you can do:
# - invoke setup --env=devel --requirements_type=dev


def generate_django_secret_key() -> str | None:
    """
    Generates a Django secret key using a subprocess and returns it.

    :return: A Django secret key.
    """
    try:
        python_executable = shutil.which("python")
        if python_executable is None:
            python_executable = "python"

        result = subprocess.run(
            [
                python_executable,
                "-c",
                "from django.core.management.utils import get_random_secret_key;"
                " print(get_random_secret_key())",
            ],
            capture_output=True,
            text=True,
            check=True,
        )
        secret_key = result.stdout.strip()
        return secret_key
    except subprocess.CalledProcessError as e:
        print(f"An error occurred while generating the secret key: {e}")
        print(f"stderr: {e.stderr}")
        print(f"stdout: {e.stdout}")

    return None


@task
def replace_secret_key(ctx):
    """
    Replace the SECRET_KEY key in the .env file with a newly generated one.
    """
    secret_key = generate_django_secret_key()

    docker_path = Path(".docker")
    prefix = "SECRET_KEY="
    secret_key_file = None

    if docker_path.exists():
        for f in docker_path.rglob("*.env"):
            with open(f, "r+") as file:
                lines = file.readlines()
                file.seek(0)  # Go back to the beginning of the file

                for line in lines:
                    if line.startswith(f"{prefix}"):
                        file.write(f"{prefix}'{secret_key}'\n")
                        secret_key_file = f
                    else:
                        file.write(line)

                file.truncate()
            file.close()
        if secret_key_file is not None:
            print(f"SECRET_KEY set in {secret_key_file}")
        else:
            print("SECRET_KEY not found in .env file")


@task
def create_env_files(ctx):
    """
    Copy .env.example files to .env files.
    """
    docker_path = Path(".docker")

    if docker_path.exists():
        for file in docker_path.rglob("*.env.example"):
            env_file = file.with_suffix("")  # Remove the '.example' suffix
            if not env_file.exists():
                print(f"Creating {env_file} from {file}...")
                shutil.copyfile(file, env_file)
                print(f"{env_file} created successfully.")
            else:
                print(f"{env_file} already exists. Skipping creation.")
    else:
        raise OSError(f"Path {docker_path} does not exist!")


@task
def create_symlinks(ctx, env: str):
    """
    Create symbolic links:
    - `compose.yaml` -> `common.yaml`
    - `compose.override.yaml` -> `{env}.yaml`
    The available environments for the override file are: 'devel', 'test', 'prod'.
    """

    accepted_values = ["devel", "test", "prod"]

    if env not in accepted_values:
        accepted_str = ",".join([f"'{el}'" for el in accepted_values])
        raise ValueError(f"Invalid env type '{env}'. Choose from: {accepted_str}.")

    current_root = Path.cwd()
    common_file = current_root / "common.yaml"
    override_source_file = current_root / f"{env}.yaml"

    compose_dest_file = current_root / "compose.yaml"
    override_dest_file = current_root / "compose.override.yaml"

    if compose_dest_file.exists():
        compose_dest_file.unlink()

    if override_dest_file.exists():
        override_dest_file.unlink()

    if common_file.exists():
        print(f"Creating symlink: {common_file} -> {compose_dest_file}")
        os.link(common_file, compose_dest_file)
        print(f"Symlink {compose_dest_file} created successfully.")
    else:
        raise FileNotFoundError(f"{common_file} not found!")

    if override_source_file.exists():
        print(f"Creating symlink: {override_source_file} -> {override_dest_file}")
        os.link(override_source_file, override_dest_file)
        print(f"Symlink {override_dest_file} created successfully.")
    else:
        raise FileNotFoundError(f"{override_source_file} not found!")


def find_file(file_name: str) -> Path | None:
    """
    Find the first file in the directory tree.
    """
    for path in Path(".").rglob(file_name):
        return path

    return None


@task
def install_requirements(ctx, requirements_type):
    """
    Install the Python dependencies using pip.
    """

    accepted_values = ["dev", "test", "prod"]

    if requirements_type not in accepted_values:
        accepted_str = ",".join([f"'{el}'" for el in accepted_values])
        raise ValueError(
            f"Invalid requirements type '{requirements_type}'. Choose from: {accepted_str}."
        )

    requirement_name = (
        f"requirements-{requirements_type}.txt"
        if requirements_type != "prod"
        else "requirements.txt"
    )

    if requirements_file := find_file(requirement_name):
        print(f"Installing Python dependencies from {requirements_file}...")
        ctx.run("python -m pip install --upgrade pip")
        ctx.run(f"python -m pip install -r {requirements_file}")
        print("Dependencies installed successfully.")
    else:
        print(
            f"Error: {requirement_name} not found. Skipping installation of dependencies."
        )


@task
def setup(ctx, env="prod", requirements_type="prod"):
    """
    Perform the entire project setup.
    :param env: The environment to setup (devel, test, prod).
    :param requirements_type: The requirements to setup (dev, test, prod).
    """
    install_requirements(ctx, requirements_type)
    create_env_files(ctx)
    replace_secret_key(ctx)
    create_symlinks(ctx, env)
    print(f"Project setup for '{env}' environment completed successfully.")


@task
def setup_devel(ctx):
    """
    Perform the entire project setup for devel.
    """
    setup(ctx, env="devel", requirements_type="dev")
