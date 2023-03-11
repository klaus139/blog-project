import Joi from 'joi';
import bcrypt from 'bcrypt'
import jwt, {JwtPayload} from 'jsonwebtoken'
import { APP_SECRET } from '../config';

export interface AuthPayload{
    id: string;
    email:string;
}

export const createToken = (id:any) => {
    return jwt.sign({ id }, APP_SECRET, { expiresIn: "1d" });
  };

export const registerSchema = Joi.object().keys({
    name: Joi.string(),
    email: Joi.string().required(),
    password: Joi.string().regex(/^[a-z0-9]{3,30}$/),
    phone: Joi.string(),
    confirm_password: Joi.any()
      .equal(Joi.ref("password"))
      .required()
      .label("Confirm password")
      .messages({ "any.only": "{{#label}} does not match" }),
  });

  export const loginSchema = Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
  });
  export const option = {
    abortearly: false,
    errors: {
      wrap: {
        label: "",
      },
    },
  };


  export const GenerateSalt = async () => {
    return await bcrypt.genSalt();
  };
  export const GeneratePassword = async (password: string, salt: string) => {
    return await bcrypt.hash(password, salt);
  };
  export const GenerateSignature = async (payload: AuthPayload) => {
    return jwt.sign( payload , APP_SECRET, { expiresIn: "30d" });
  };
  //GENERATE TOKEN FOR A USER
  export const verifySignature = async (signature: string) => {
    return jwt.verify(signature, APP_SECRET) as JwtPayload;
  };
  export const validatePassword = async (
    enteredPassword: string,
    savedPassword: string,
    salt: string
  ) => {
    return (await GeneratePassword(enteredPassword, salt)) === savedPassword;
  };

 