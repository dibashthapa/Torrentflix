import Joi from "@hapi/joi";
export default {
    userCredential: Joi.object().keys({
        email: Joi.string().required().email(),
        password: Joi.string().required().min(8),
    }),
    signup: Joi.object().keys({
        name: Joi.string().required().min(3),
        email: Joi.string().required(),
        password: Joi.string().required().min(6),
    }),
};
//# sourceMappingURL=schema.js.map