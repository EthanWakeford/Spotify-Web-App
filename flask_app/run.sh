#script to run flask app in debug mode, with spotify credentials as env vars

tilix -a session-add-down -e 'npm start --prefix ./react_frontend'              
CLIENT_ID=752437c291344a77831d18c36df14480 CLIENT_SECRET=2411fce368c047d1a649b48a55cdc061 flask --app flask_setup.py run --debug --host localhost --port 5000
