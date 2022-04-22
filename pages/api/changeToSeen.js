import { GraphQLClient } from "graphql-request";

const changeToSeen = async ({ body }, response) => {
	const graphCMS = new GraphQLClient(process.env.ENDPOINT, {
		headers: {
			Authorization: `Bearer ${process.env.GRAPH_CMS_TOKEN}`,
		},
	});
	await graphCMS.request(
		`
    mutation($slug: String!){
      updateVideo(where:
        {slug: $slug},
        data:{seen:true}){
          id,
          seen, 
          title
        }
    }
    `,
		{ slug: body.slug }
	);

	await graphCMS.request(
		`
    mutation publishVideo($slug: String!){
      publishVideo(where:
        {slug: $slug},
        to:PUBLISHED){
          slug,
        }
    }
    `,
		{ slug: body.slug }
	);
	response.status(201).json({ slug: body.slug });
};

export default changeToSeen;
