import Client from "@notionhq/client/build/src/Client";

const token = "secret_hFmZJ5uvgX4FzSraMDxyyUI9WCWGMmRHjLj5OUUQYHj";

const rootPage = "acaf811332284822ba60b6e57808fbaf";

const notion: Client = new Client({
  auth: token,
});

(async () => {
  const listUsersResponse = await notion.users.list({});
  console.log(listUsersResponse);
  const page = await notion.pages.retrieve({ page_id: rootPage });
  console.log("root", page);
  const childLinks = await notion.blocks.children.list({ block_id: page.id });
  console.log("links", childLinks);

  const children = await Promise.all(
    childLinks.results.map((c) => notion.blocks.retrieve({ block_id: c.id }))
  );
  console.log("children", children);
})();
