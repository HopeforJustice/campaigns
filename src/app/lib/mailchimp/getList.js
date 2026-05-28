import getMailchimpConfig from "./getMailchimpConfig";
//all now go to new audience
export default async function getList(
	country = "uk",
	useGlobalAudience = true,
) {
	const mailchimp = getMailchimpConfig();
	let id;
	if (useGlobalAudience) {
		id = process.env.MC_GLOBAL_AUDIENCE_ID;
	} else if (country === "uk") {
		id = process.env.MC_UK_AUDIENCE_ID;
	} else if (country === "us") {
		id = process.env.MC_US_AUDIENCE_ID;
	} else {
		id = process.env.MC_ROW_AUDIENCE_ID;
	}

	const response = await mailchimp.lists.getList(id);
	return response;
}
