import type { NextApiRequest, NextApiResponse } from "next";
import base from "../../src/middleware/common";
import mailChimpClient from "@mailchimp/mailchimp_marketing";

interface List {
  id: string;
  web_id: number;
  name: string;
  contact: {
    company: string;
    ddress1: string;
    address2: string;
    city: string;
    state: string;
    zip: string;
    country: string;
    phone: string;
  };
  permission_reminder: string;
  use_archive_bar: false;
  campaign_defaults: {
    from_name: string;
    from_email: string;
    subject: string;
    language: string;
  };
  notify_on_subscribe: false;
  notify_on_unsubscribe: false;
  date_created: string;
  list_rating: number;
  email_type_option: true;
  subscribe_url_short: string;
  subscribe_url_long: string;
  beamer_address: string;
  visibility: string;
  double_optin: false;
  has_welcome: false;
  marketing_permissions: false;
  modules: string[];
  stats: {
    member_count: number;
    total_contacts: number;
    unsubscribe_count: number;
    cleaned_count: number;
    member_count_since_send: number;
    unsubscribe_count_since_send: number;
    cleaned_count_since_send: number;
    campaign_count: number;
    campaign_last_sent: string;
    merge_field_count: number;
    avg_sub_rate: number;
    avg_unsub_rate: number;
    target_sub_rate: number;
    open_rate: number;
    click_rate: number;
    last_sub_date: string;
    last_unsub_date: string;
  };
  _links: {
    rel: string;
    href: string;
    method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "OPTIONS" | "HEAD";
    targetSchema: string;
    schema: string;
  }[];
}

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

      const newMember = (await mailChimpClient.lists.addListMember(audienceId, {
        email_address: email,
        status: "pending",
      })) as mailChimpClient.MembersSuccessResponse;

      return res.status(201).json({ email: newMember.email_address });
    } catch (error) {
      console.error(error);

      return res.status(500).json("Internal Server Error");
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

      const { email } = req.body;

      if (!email) {
        return res.status(400).json("Error: No email found in body");
      }

      mailChimpClient.setConfig({
        apiKey: key,
        server: serverPrefix,
      });

      const user = (await mailChimpClient.lists.getListMember(
        audienceId,
        email
      )) as mailChimpClient.MembersSuccessResponse;

      if (user.status === "subscribed" && !user.merge_fields.QUEUEPOS) {
        const userId = user.id;
        const Lists = mailChimpClient.lists as unknown as {
          getList: (listId: string) => Promise<List>;
        };
        const list = await Lists.getList(audienceId);

        const queueLength = list.stats.member_count;

        await mailChimpClient.lists.setListMember(audienceId, userId, {
          status: "subscribed",
          merge_fields: { QUEUEPOS: queueLength },
          status_if_new: "pending",
          email_address: email,
        });

        return res.status(200).send({
          queuePosition: queueLength,
        });
      } else if (user.status === "subscribed" && user.merge_fields.QUEUEPOS) {
        return res.status(200).send({
          queuePosition: user.merge_fields.QUEUEPOS,
        });
      } else {
        return res
          .status(400)
          .json("Error: User is not subscribed to mailing list");
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json("Internal Server Error");
    }
  });

export default handler;
