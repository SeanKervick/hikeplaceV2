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
    title: Joi.string().required(),
    description: Joi.string().required(),
    longitude: Joi.number().allow("").optional(),
    latitude: Joi.number().allow("").optional(),
    distance: Joi.number().allow("").optional(),
    difficulty: Joi.string().required(),
    userid: IdSpec,
  })
  .label("Location");

export const LocationSpecPlus = LocationSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("LocationPlus");

export const LocationArraySpec = Joi.array().items(LocationSpecPlus).label("LocationArray");

// export const LocationSpec = {
//   title: Joi.string().required(),
//   description: Joi.string().required(),
//   longitude: Joi.number().allow("").optional(),
//   latitude: Joi.number().allow("").optional(),
//   distance: Joi.number().allow("").optional(),
//   difficulty: Joi.string().required(),
// };