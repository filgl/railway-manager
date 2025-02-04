# 🚂 Railway Manager Backend

This is the backend service for the Railway Manager application, built using Django and Django REST Framework (DRF).
It provides APIs for managing stations, routes, train models, and active trains.

## 📌 Features
- User authentication (registration, login, password reset)
- CRUD operations for stations, routes, train models, and trains
- Secure API access with authentication and permission control
- Dockerized setup for easy deployment

---

## ⚙️ Requirements
Ensure you have the following installed on your system:

- [Python](https://www.python.org/) (>= 3.8 recommended)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

---

## 🚀 Setup and Run
Follow these steps to get the backend running:

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/filgl/railway-manager.git
cd railway-management/backend
```

### 2️⃣ Set Up Environment Variables
Copy the example environment files and configure the necessary variables:
```sh
cd .docker
cp pg_conf.env.example pg_conf.env
cp secret.env.example secret.env
cp superuser_conf.env.example superuser_conf.env
```
Inside `pg_conf.env` set the values for the PostgreSQL databse. If you don't have any preferences, you can leave
everything as is.

Inside `secret.env` set the values for the Django settings. If you don't have any preferences, you can leave everything
as is except for the `SECRET_KEY` field.\
To fill it, you need to generate a Django secret key:
```sh
python
from django.core.management.utils import get_random_secret_key
print(get_random_secret_key())
```
Copy the output and paste it in the `SECRET_KEY` field. Don't remove the apexes at the start and end of the string.

Inside `superuser_conf.env` set the values for the username, email and password of the superuser account. If you don't
have any preferences, you can leave everything as is. Otherwise, you can set custom values for each field.

### 3️⃣ Create the necessary Docker files
Open the terminal (Command Prompt on Windows, not PowerShell, as an administrator) and run the following command inside the `backend` folder:
```sh
mklink compose.yaml common.yaml
mklink compose.override.yaml devel.yaml
```

### 4️⃣ Decide if you want to Import Existing Data
If you want, there is an existing dataset that will automatically be imported once you start the
application. This is done in order to fill the database with some data, so that you won't find an empty app when you
start it.

If you don't want to import the example data, remove the following line of code
`./manage.py loaddata project_data.json &&` found in the `devel.yaml` file at line `7`, inside the `backend` folder.

### 5️⃣ Run the Backend with Docker
The project is configured to use Docker with `docker-compose`.
To start the backend, simply run:
```sh
docker compose build
docker compose up
```
This will:
- Start the Django application
- Set up the database
- Load the environment variables
- Create a superuser
- Load the existing dataset (if you didn't remove the line of code to import it)

The `compose.yaml` and `compose.override.yaml` file from `common.yaml` and `devel.yaml` will handle local development configuration.

### 6️⃣ Access the API
Once running, you can access the API at:
```sh
http://localhost:8000/api/
```
For the Django Admin Panel:
```sh
http://localhost:8000/admin/
```
Login with the superuser credentials you specified inside the `superuser_conf.env` file.

---

## ✅ Conclusion
Your backend is now set up and running! For frontend setup, follow the instructions in the frontend `README.md`. 🚀
