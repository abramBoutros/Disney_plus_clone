import { gql, GraphQLClient } from "graphql-request";
import Link from "next/link";
import { useState } from "react";

export const getServerSideProps = async (pageContext) => {
	const url = process.env.ENDPOINT;
	const pageSlug = pageContext.query.slug;

	const graphQLClient = new GraphQLClient(url, {
		headers: {
			Authorization: `Bearer ${process.env.GRAPH_CMS_TOKEN}`,
		},
	});

	const query = gql`
		query ($pageSlug: String!) {
			video(where: { slug: $pageSlug }) {
				id
				createdAt
				title
				description
				seen
				slug
				tags
				thumbnail {
					url
				}
				mp4 {
					url
				}
			}
		}
	`;
	const variables = {
		pageSlug,
	};

	const data = await graphQLClient.request(query, variables);

	return {
		props: { video: data.video },
	};
};

const changeToSeen = async (slug) => {
	console.log("cliecked");
	await fetch("/api/changeToSeen", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ slug }),
	});
};

const Video = ({ video }) => {
	const [watching, setWatching] = useState(false);
	return (
		<>
			{!watching && (
				<>
					<img
						className="video-image"
						src={video.thumbnail.url}
						alt={video.title}
					/>
					<div className="info">
						<p>{video.tags.join(", ")}</p>
						<p>{video.description}</p>
						<Link href="/">go back</Link>
						<button
							className="video-overlay"
							onClick={() => {
								console.log("me");
								changeToSeen(video.slug);
								setWatching(!watching);
							}}
						>
							PLAY
						</button>
					</div>
				</>
			)}

			{watching && (
				<video width="100%" controls autoPlay>
					<source src={video.mp4.url} type="video/mp4" />
				</video>
			)}
			<div className="info-footer" onClick={() => setWatching(!watching)}></div>
		</>
	);
};

export default Video;
