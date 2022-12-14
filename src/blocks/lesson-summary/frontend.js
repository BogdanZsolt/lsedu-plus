import Rating from '@mui/material/Rating/index';
import { render, useState, useEffect } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';

function LessonRating(props) {
	const [avgRating, setAvgRating] = useState(props.avgRating);
	const [permission, setPermission] = useState(props.loggedIn);

	useEffect(() => {
		if (props.ratingCount) {
			setPermission(false);
		}
	}, []);

	return (
		<Rating
			value={avgRating}
			precision={0.5}
			onChange={async (event, rating) => {
				if (!permission) {
					return alert(
						'You have already rated this lesson or you may need to log in.'
					);
				}

				setPermission(false);

				const response = await apiFetch({
					// example.com/wp-json/lsedup/v1/rate
					path: 'lsedup/v1/rate',
					method: 'POST',
					data: {
						postID: props.postID,
						rating,
					},
				});

				if (response.status == 2) {
					setAvgRating(response.rating);
				}
			}}
		/>
	);
}

document.addEventListener('DOMContentLoaded', () => {
	if (document.querySelector('#lesson-rating')) {
		const block = document.querySelector('#lesson-rating');

		const postID = parseInt(block.dataset.postId);
		const avgRating = parseFloat(block.dataset.avgRating);
		const loggedIn = !!block.dataset.loggedIn;
		const ratingCount = !!parseInt(block.dataset.ratingCount);

		render(
			<LessonRating
				postID={postID}
				avgRating={avgRating}
				loggedIn={loggedIn}
				ratingCount={ratingCount}
			/>,
			block
		);
	}
});
