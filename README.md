
## [jobs-api project](https://job-api-temp.onrender.com/)

### Setup

`npm install && npm start`

### Database Connection
1. Import connectDB.js from db
2. Invoke in start()
3. setup .env in the root
4. Add mongoURL with correct value

### Routers
- auth.js
- jobs.js

### User Model
- Email Validation Regex

`/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/`

### Register User

- Validate - name, email, password - with Mongoose
- Hash Password (with bcryptjs)
- Save User
- Generate Token
- Send Response with Token

### Login User

- Validate - email, password - in controller
- If email or password is missing, throw BadRequestError
- Find User
- Compare Passwords
- If no user or password does not match, throw UnauthenticatedError
- If correct, generate Token
- Send Response with Token

### Tested all User and Jobs APIs using Postman

- [Postman Collection](https://schema.postman.com/json/collection/v2.1.0/collection.json)


### Mongoose Errors

- Validation Errors
- Duplicate (Email)
- Cast Error


### Security

- helmet --> to set security related http response headers.
- cors --> to allow access from different domains.
- xss-clean --> to sanitize user input
- express-rate-limit --> to limit request made from each IP address


### [Swagger UI Documentation](https://job-api-temp.onrender.com/api-docs)

`
/jobs/{id}:
  parameters:
    - in: path
      name: id
      schema:
        type: string
      required: true
      description: the job id
`

### Deployed on Render