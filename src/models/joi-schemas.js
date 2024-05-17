import Joi from "joi";

export const IdSpec = Joi.alternatives().try(Joi.string(), Joi.object()).description("a valid ID");
                                                                                     
export const UserSpec = Joi.object()
  .keys({
    firstName: Joi.string().example("Homer").required(),
    lastName: Joi.string().example("Simpson").required(),
    email: Joi.string().email().example("homer@simpson.com").required(),
    password: Joi.string().example("secret").required(),
    _id: IdSpec,
    __v: Joi.number(),
  })
  .label("UserDetails");

export const UserArray = Joi.array().items(UserSpec).label("UserArray");

export const UserCredentialsSpec = {
  email: Joi.string().email().required(),
  password: Joi.string().required(),
};

export const LocationSpec = Joi.object()
  .keys({
    title: Joi.string().example("Mahon Falls").required(),
    description: Joi.string().example("Nice Waterfall").required(),
    longitude: Joi.number().example("78.465").optional(),
    latitude: Joi.number().example("78.465").optional(),
    distance: Joi.number().example("10").optional(),
    difficulty: Joi.string().example("Beginner").optional(),
    userid: IdSpec,
    public_location: Joi.boolean().optional().default(false),
  })
  .label("Location");

export const LocationArray = Joi.array().items(LocationSpec).label("LocationArray");


export const LocationSpecPlus = LocationSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("LocationPlus");

export const LocationArraySpec = Joi.array().items(LocationSpecPlus).label("LocationArray");
