import { gql } from "@apollo/client";

export const AUTH_QUERIES = {
  ME: gql`
    query me {
      me {
        username
        firstname
        lastname
        avatar
        bio
        email
        dob
        gender
        phone
        role {
          name
          permissions
        }
        membershipStatus
      }
    }
  `,
  GET_EMAIL_OTP: gql`
    query emailOtp($email: String!) {
      emailOtp(email: $email) {
        id
        email
        otp
        verified
      }
    }
  `,
};
