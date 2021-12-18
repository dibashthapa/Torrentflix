import Joi from "@hapi/joi";

const re = /magnet:?xt=dn=(?<link>.+?)\&/;
export default {
  videoCreate: Joi.object().keys({
    magnetLink: Joi.string()
      .required()
      .regex(re)
      .message("Please enter valid magnet link"),
    jobId: Joi.string().required(),
  }),
};
