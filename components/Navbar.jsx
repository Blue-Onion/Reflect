import Image from "next/image";
import Link from "next/link";
import {

  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from '@clerk/nextjs'
import { Button } from "./ui/button";
import { FolderOpen, PenBox } from "lucide-react";
import UserMenu from "./UserMenu";

const Navbar = () => {

  return (
    <header className="container mx-auto max-w-none px-7 py-3">

      <nav className="py-6 px-3 flex justify-between items-center">
        <Link href={"/"}>
          <Image alt="Reflect Logo" src={"/logo.png"} width={200} height={60} className="h-10 w-auto object-contain" />
        </Link>
        <div className="flex items-center gap-4">
          {/* login */}
          <SignedIn>
            <Link href={"/dashboard/collections"}>
            <Button variant={"outline"}>
              <FolderOpen size={19}/>
              <span className="hidden md:inline">Check your Collections</span>
            </Button>
            </Link>
          </SignedIn>
          <Link href={"/journal/write"}>
            <Button className={"gap-2 flex justify-center items-center"} variant={"journal"}>
              <PenBox size={19} />
              <span className="hidden md:inline">Write New</span>
            </Button>
          </Link>
          <SignedOut>
            <SignInButton forceRedirectUrl="/dashboard" >
              <Button variant={"outline"}>
                Login
              </Button>
            </SignInButton>
          </SignedOut>
          <SignUpButton>
            <UserMenu/>
          </SignUpButton>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
