import Image from "next/image";
import Link from "next/link";
import { auth, signOut, signIn } from "@/auth";

const Navbar = async () => {
  const session = await auth();

  return (
    <header className="px-5 py-3 bg-white shadow-sm font-word-sans">
      <nav className="flex justify-between items-center">
        {/* Logo */}
        <Link href="/">
          <Image src="/logo.png" alt="logo" width={144} height={30} priority />
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-5 text-black">
          {session?.user ? (
            <>
              {/* Authenticated User Links */}
              <Link href="/starting/create">
                <span className="cursor-pointer hover:text-gray-600">
                  Create
                </span>
              </Link>
              <form
                action={async () => {
                  "use server";
                  await signOut({ redirectTo: "/" });
                }}
              >
                <button
                  type="submit"
                  className="cursor-pointer hover:text-red-500"
                >
                  Logout
                </button>
              </form>
              <Link href={`/user/${session.user.id}`}>
                <span className="cursor-pointer hover:text-blue-500">
                  {session.user.name}
                </span>
              </Link>
            </>
          ) : (
            <>
              {/* Unauthenticated User Links */}
              <form
                action={async () => {
                  "use server";
                  await signIn("github");
                }}
              >
                <button
                  type="submit"
                  className="cursor-pointer hover:text-green-500"
                >
                  Login with GitHub
                </button>
              </form>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
