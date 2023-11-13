import {getAllDogs, getDogImage} from '@/services/dogs';
import DogList from '@/components/DogList/DogList';

export async function fetchDogs() {
	const data = await getAllDogs();

	const dogPromises = Object.keys(data).map(async (dog) => {
		const image = await getDogImage(dog).then((image) => image.message);
		return {
			[dog]: {
				breed: dog,
				image: image,
				subBreeds: data[dog],
			},
		};
	});

	const dogs = await Promise.all(dogPromises);

	return dogs.reduce((acc, dog) => {
		return { ...acc, ...dog };
	}, {});

}

export default async function Dogs() {
	const dogs = await fetchDogs();
	return <DogList dogs={dogs} />;
}
