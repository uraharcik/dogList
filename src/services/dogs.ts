import {ALL_DOGS} from '@/shared/constants/constants';

export const getAllDogs = async (value?: string) => {
	const res = await fetch(ALL_DOGS);
	const data = await res.json()
	return data.message
};

export const getDogImage = async (breed: string):Promise<{message: string, status: string}> => {
	const res = await fetch(`https://dog.ceo/api/breed/${breed}/images/random`);
	return res.json();
}
