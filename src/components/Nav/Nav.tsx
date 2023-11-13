"use client";
import {Navbar, NavbarBrand, NavbarContent} from '@nextui-org/react';
import React from 'react';
import Link from 'next/link';
import dogLogo from '@/assets/icons/dog-icon.svg';
import Image from 'next/image';
export default function Nav() {
	return (
		<Navbar isBordered>
				<NavbarContent justify="end">
					<Link href="/">
					<NavbarBrand>
						<Image src={dogLogo} alt={'dog list logo'} width={30} height={30}/>
						<p className="hidden sm:block font-bold text-inherit ml-1.5">DogList</p>
					</NavbarBrand>
					</Link>
				</NavbarContent>

		</Navbar>
	)
}
