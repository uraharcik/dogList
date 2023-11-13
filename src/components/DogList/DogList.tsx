'use client';
import DogCard from '@/components/Card/DogCard';
import {SearchIcon} from '@nextui-org/shared-icons';
import {Button, Input, ModalBody, ModalFooter, ModalHeader, useDisclosure} from '@nextui-org/react';
import React, {useEffect, useState} from 'react';
import {Modal, ModalContent} from '@nextui-org/modal';
import {getDogImage} from '@/services/dogs';
interface DogItem {
	breed: string;
	image: string;
	subBreeds: string[],
}
interface Props {
	dogs: Record<string, DogItem>;
}

export default function DogList(props: Props) {
	const [searchValue, setSearchValue] = useState('');
	const [selected, setSelected] = useState<DogItem>();
	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchValue(e.target.value);
	}
	const [subBreedData, setSubBreedData] = useState<DogItem[]>();
	const {isOpen, onOpen, onOpenChange} = useDisclosure();
	useEffect(() => {
		const fetchSubBreedData = async () => {
			if (selected?.subBreeds) {
				const subBreedPromises = selected.subBreeds.map((subBreed) => {
					return getDogImage(`${selected.breed}/${subBreed}`).then((image) => {
						return {
							breed: subBreed,
							image: image.message,
							subBreeds: [],
						};
					});
				});

				const subBreedsData = await Promise.all(subBreedPromises);
				setSubBreedData(subBreedsData);
			}
		};

		void fetchSubBreedData();
	}, [selected]);
	const dogs = props.dogs;
	const filteredDogs = Object.keys(dogs).filter((breed) => breed.toLowerCase().includes(searchValue.toLowerCase()));
	const filteredDogsObject = filteredDogs.reduce((acc:Record<string, DogItem>, breed) => {
		acc[breed] = dogs[breed];
		return acc;
	}, {});

	return (
		<>
			<Input
				classNames={{
					base: "max-w-full sm:max-w-[12rem] h-10 mx-auto mt-2",
					mainWrapper: "h-full o w-full",
					input: "text-small",
					inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20 mx-auto",
				}}
				placeholder="Type to search..."
				size="sm"
				variant="bordered"
				startContent={<SearchIcon width={18} height={18}/>}
				type="search"
				onChange={onChange}
				value={searchValue}
			/>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4 max-w-[1600px] mx-auto">
				{filteredDogsObject ? Object.keys(filteredDogsObject).map((dog) => (
					<div
						key={dog}
						style={{cursor: dogs[dog as keyof object].subBreeds.length > 0 ? 'pointer' : 'default'}}
						onClick={() => {
							if (dogs[dog as keyof object].subBreeds.length > 0) {
								onOpen();
								setSelected(dogs[dog as keyof object])
							}
						}}
					>
						<DogCard
							breed={dog}
							subBreeds={dogs[dog as keyof object].subBreeds}
							image={dogs[dog as keyof object].image}
						/>
					</div>
				)) : <p>Error: Somebody let the dogs out</p>}
			</div>
			<Modal
				isOpen={isOpen}
				onOpenChange={onOpenChange}
				backdrop="blur"
				size="5xl"
				placement='top-center'
				onClose={() => {setSelected(undefined)}}
				className="max-h-[80vh] overflow-auto"
			>
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader className="flex flex-col gap-1 capitalize">{selected?.breed}</ModalHeader>
							<ModalBody>
								<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4 p-4 max-w-[1400px] mx-auto">
									{subBreedData?.map((subBreed) =>
											<DogCard breed={subBreed.breed} subBreeds={[]} image={subBreed.image} key={subBreed.breed}/>

									)}
								</div>

							</ModalBody>
							<ModalFooter>
								<Button color="danger" variant="light" onPress={onClose}>
									Close
								</Button>
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>
		</>

	)
}
