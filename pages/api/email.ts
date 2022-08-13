import { Request, Response } from "express";
import base from "../../src/middleware/common";
import SibApiV3Sdk from "sib-api-v3-sdk";

const handler = base().post(async (req: Request, res: Response) => {
  try {
    let defaultClient = SibApiV3Sdk.ApiClient.instance;

    let apiKey = defaultClient.authentications["api-key"];
    const key = process.env.MAIL_LIST_API_KEY;

    if (!key) {
      res.status(500).send("Error: No API key found");
    }

    apiKey.apiKey = key;

    let apiInstance = new SibApiV3Sdk.ContactsApi();

    const createDoiContact = new SibApiV3Sdk.CreateDoiContact();

    const { email } = req.body;

    if (!email) {
      res.status(400).json("Error: No email found in body");
    }

    createDoiContact.email = email;
    createDoiContact.includeListIds = [3];
    createDoiContact.templateId = 2;
    createDoiContact.redirectionUrl = "http://localhost:3000/";

    apiInstance.createDoiContact(createDoiContact).then(
      function (data) {
        res.status(201).json("Contact Added Successfully");
      },
      function (error) {
        res.status(error.status).json(error.message);
      }
    );
  } catch (error) {
    res.status(500).json(error.message);
  }
});

export default handler;
