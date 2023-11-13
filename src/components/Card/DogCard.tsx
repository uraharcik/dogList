
import {Card, CardFooter, Button} from '@nextui-org/react';
import Image from 'next/image';
import noImage from 'src/assets/images/noDog.png';
export default function DogCard(item: {breed: string, subBreeds: string[], image?: string}) {
	const {breed, subBreeds, image} = item;
	return (
		<Card
			isFooterBlurred
			isBlurred
			radius="lg"
			className="max-w-[300px] max-h-[200px] rounded-lg bg-default-200"
		>
					<Image
						className="object-cover rounded-lg"
						width={300}
						height={250}
						src={image ? image : noImage}
						alt={breed}
						/>
			<CardFooter
				className="justify-between before:bg-white/50 border-white/60 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-lg bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
				<p className="text-tiny text-white/80 capitalize">{breed}</p>
				{subBreeds.length > 0 && (
					<Button className="text-tiny text-white bg-black/20 rounded-lg p-1" variant="flat" color="default" radius="lg" size="sm">
						Sub Breeds
					</Button>
				)}
			</CardFooter>
		</Card>
	)
}
