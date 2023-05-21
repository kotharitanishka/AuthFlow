# AuthFlow : Generic Authentication Flow with OTP Verification

This project provides a generic authentication flow that can be easily integrated into any of your existing projects. It includes OTP (One-Time Password) verification as an additional security measure during the authentication process.

## Features

- User Registration: Users can create new accounts by providing their desired credentials.
- User Login: Existing users can log in with their registered email and password.
- Password Encryption: User passwords are securely encrypted to protect sensitive information.
- Access Control: Certain resources can be restricted to authenticated users only.
- Password Reset: A password reset functionality is implemented to assist users in case they forget their password.
- OTP Verification: When users forget their password, they need to enter a One-Time Password (OTP) that is sent to their registered email address for an extra layer of verification.

## Getting Started

To integrate the generic authentication flow with OTP verification into your project, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/kotharitanishka/AuthFlow.git
   ```

2. Install the dependencies:

   ```bash
   cd generic-authentication-flow-otp
   npm install
   ```

3. Configure the authentication settings:

   - Modify the configuration file (`config.js`) to suit your project requirements.
   - Set up the database connection parameters in the configuration file.

4. Set up email service:

   - Configure the SMTP settings in the configuration file to enable sending OTP emails.
   - Provide the necessary credentials for the email service.

5. Run the application:

   ```bash
   npm start
   ```

6. Access the application:

   Open your web browser and navigate to `http://localhost:3000` to see the authentication flow with OTP verification in action.


## Contributing

Contributions to this project are welcome! If you encounter any issues or have suggestions for improvements, please feel free to submit a pull request or open an issue on the GitHub repository.

## Acknowledgements

- [Express](https://expressjs.com/) - Fast, unopinionated, minimalist web framework for Node.js
- [Node.js](https://nodejs.org/en) - Utilized as the backend framework
- [Bcrypt.js](https://github.com/dcodeIO/bcrypt.js) - A library to help hash passwords.
- [Nodemailer](https://nodemailer.com/) - Send e-mails from Node.js
- [MongoDB](https://www.mongodb.com/) - A general-purpose, document-based, distributed database.

## Contact

If you have any questions or inquiries, please feel free to contact the project maintainer at tanishka.k.kothari@gmail.com.

