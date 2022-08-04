import { Request, Response } from "express";
import nc from "next-connect";
import SibApiV3Sdk from "sib-api-v3-sdk";

const handler = nc().post(async (req: Request, res: Response) => {
  try {
    let defaultClient = SibApiV3Sdk.ApiClient.instance;

    let apiKey = defaultClient.authentications["api-key"];
    const key = process.env.MAIL_LIST_API_KEY;

    if (!key) {
      res.status(500).send("Error: No API key found");
    }

    apiKey.apiKey = key;

    let apiInstance = new SibApiV3Sdk.ContactsApi();

    const createContact = new SibApiV3Sdk.CreateContact();

    const { email } = req.body;

    if (!email) {
      res.status(400).json("Error: No email found in body");
    }

    createContact.email = email;
    createContact.listIds = [2];

    apiInstance.createContact(createContact).then(
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
