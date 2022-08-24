import type { NextApiRequest, NextApiResponse } from "next";
import base from "../../src/middleware/common";
import mailChimpClient from "mailchimp-marketing";

const handler = base()
  .post(async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const key = process.env.MAILCHIMP_API_KEY;
      const serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX;
      const audienceId = process.env.MAILCHIMP_AUDIENCE_ID;

      if (!key) {
        return res.status(500).send("Error: No API key found");
      }

      if (!serverPrefix) {
        return res.status(500).send("Error: No server prefix found");
      }

      if (!audienceId) {
        return res.status(500).send("Error: No audience Id found");
      }

      const { email } = req.body;

      if (!email) {
        return res.status(400).json("Error: No email found in body");
      }

      mailChimpClient.setConfig({
        apiKey: key,
        server: serverPrefix,
      });

      await mailChimpClient.lists.addListMember(audienceId, {
        email_address: email,
        status: "pending",
      });

      return res.status(201).json("Contact Added Successfully");
    } catch (error) {
      const errorMessage = JSON.parse(error.response.text).title;

      return res.status(500).json(errorMessage);
    }
  })
  .put(async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const key = process.env.MAILCHIMP_API_KEY;
      const serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX;
      const audienceId = process.env.MAILCHIMP_AUDIENCE_ID;

      if (!key) {
        return res.status(500).send("Error: No API key found");
      }

      if (!serverPrefix) {
        return res.status(500).send("Error: No server prefix found");
      }

      if (!audienceId) {
        return res.status(500).send("Error: No audience Id found");
      }

      const { email, userId } = req.body;

      if (!email) {
        return res.status(400).json("Error: No email found in body");
      }

      if (!userId) {
        return res.status(400).json("Error: No user Id found in body");
      }

      mailChimpClient.setConfig({
        apiKey: key,
        server: serverPrefix,
      });

      const user = await mailChimpClient.lists.getListMember(audienceId, email);
      if (user.unique_email_id !== userId) {
        return res.status(400).json("Error: Invalid user Id");
      }

      if (user.status === "pending") {
        const userId = user.id;
        const list = await mailChimpClient.lists.getList(audienceId);

        const queueLength = list.stats.member_count;

        await mailChimpClient.lists.setListMember(audienceId, userId, {
          status: "subscribed",
          merge_fields: { QUEUEPOS: queueLength + 1 },
        });

        return res.status(200).send({
          updated: true,
          queuePositon: queueLength + 1,
        });
      } else if (user.status === "subscribed") {
        return res.status(200).send({
          updated: false,
          queuePosition: user.merge_fields.QUEUEPOS,
        });
      } else {
        return res
          .status(400)
          .json("Error: User status is neither pending nor subscribed");
      }
    } catch (error) {
      const errorMessage = JSON.parse(error.response.text).title;

      return res.status(500).json(errorMessage);
    }
  });

export default handler;
