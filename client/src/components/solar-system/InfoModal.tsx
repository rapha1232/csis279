import React from "react";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";

interface Props {
  PlanetName: string;
  PlanetParagraph: string;
}

/**
 * This component is used to display a modal with information about a planet.
 * @param {string} PlanetName - The name of the planet
 * @param {string} PlanetParagraph - A paragraph about the planet
 * @returns {JSX.Element} - A modal with information about a planet
 */
const InfoModal = ({ PlanetName, PlanetParagraph }: Props) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button hidden />
      </SheetTrigger>
      <SheetContent className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle>{PlanetName}</SheetTitle>
          <SheetDescription>{PlanetParagraph}</SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default InfoModal;
