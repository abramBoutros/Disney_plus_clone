import { gql, GraphQLClient } from "graphql-request";

import Section from "../components/Section";
import Navbar from "../components/Navbar";

export const getStaticProps = async () => {
	const url = process.env.ENDPOINT;
	console.log(process.env.ENDPOINT);

	const graphQLClient = new GraphQLClient(url, {
		headers: {
			Authorization: `Bearer ${process.env.GRAPH_CMS_TOKEN}`,
		},
	});

	const videosQuery = gql`
		query {
			videos {
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

	const accountQuery = gql`
		query {
			account(where: { id: "cl28qab525j1r0cupp4hr24ia" }) {
				username
				avatar {
					id
					url
				}
			}
		}
	`;

	const data = await graphQLClient.request(videosQuery);
	const videos = data.videos;

	const accountData = await graphQLClient.request(accountQuery);
	const account = accountData.account;

	return {
		props: { videos, account },
	};
};

export default function Home({ videos, account }) {
	const genRandomVideo = () => {
		return videos[Math.floor(Math.random() * videos.length)];
	};
	// const randomVideo = genRandomVideo(videos);

	const filterVideos = (videos, genre) => {
		return videos.filter((video) => video.tags.includes(genre));
	};
	const unSeenVideos = (videos) => {
		return videos.filter((video) => video.seen == false || video.seen == null);
	};
	return (
		<>
			<Navbar account={account} />
			<div className="app">
				<div className="main-video">
					{/*
					 // i was going to choose the banner to be random video but i choose to always show batman instead
					<img
						className="rand-img"
						src={randomVideo.thumbnail.url}
						alt={randomVideo.title}
					/> */}
					<img
						className="rand-img"
						src={videos[0].thumbnail.url}
						alt={videos[0].title}
					/>
				</div>
				{/* <div className="video-feed">
					<Link href="#Action">
						<div className="franchise" id="Action">
							<p>Action</p>
						</div>
					</Link>
					<Link href="#Adventure">
						<div className="franchise" id="Adventure"></div>
					</Link>
					<Link href="#Drama">
						<div className="franchise" id="Drama"></div>
					</Link>
					<Link href="#Fiction">
						<div className="franchise" id="Fiction"></div>
					</Link>
					<Link href="#Mystery">
						<div className="franchise" id="Mystery"></div>
					</Link>
				</div> */}
				<Section genre={"Recommended for you"} videos={unSeenVideos(videos)} />
				<Section
					genre={"Action"}
					id="Action"
					videos={filterVideos(videos, "action")}
				/>
				<Section
					id="Adventure"
					genre={"Adventure"}
					videos={filterVideos(videos, "adventure")}
				/>
				<Section
					genre={"Drama"}
					id="Drama"
					videos={filterVideos(videos, "drama")}
				/>
				<Section
					genre={"Fiction"}
					id="Fiction"
					videos={filterVideos(videos, "fiction")}
				/>
				<Section
					genre={"Mystery"}
					id="Mystery"
					videos={filterVideos(videos, "mystery")}
				/>
			</div>
		</>
	);
}
