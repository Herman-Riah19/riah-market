"use client"
import Link from "next/link";

const Footer = () => {

  return (
    <footer id="footer" className="bg-muted">
      <hr className="w-11/12 mx-auto" />

      <section className="container py-20 grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-x-12 gap-y-8">
        <div className="col-span-full xl:col-span-2">
          <Link
            href={`/`}
          >
            <h1 color='secondary' className='capitalize bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text'>
              Riah Market
            </h1>
          </Link>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="font-bold text-lg">Sommary</h3>
          <div>
            <Link
              href={`/`}
              className="opacity-60 hover:opacity-100"
            >
              Home
            </Link>
          </div>

          <div>
            <Link
              href={`/about`}
              className="opacity-60 hover:opacity-100"
            >
              About
            </Link>
          </div>
          <div>
            <Link
              href={`/pricing`}
              className="opacity-60 hover:opacity-100"
            >
              Pricing
            </Link>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="font-bold text-lg">Platforms</h3>
          <div>
            <Link
              href={`/midas/generate`}
              className="opacity-60 hover:opacity-100"
            >
                Generate
            </Link>
          </div>

          <div>
            <Link
              href={`/midas/generate/change`}
              className="opacity-60 hover:opacity-100"
            >
            Change
            </Link>
          </div>

          <div>
            <Link
              href={`/midas/generate/upscale`}
              className="opacity-60 hover:opacity-100"
            >
              Upscale
            </Link>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="font-bold text-lg">User</h3>
          <div>
            <Link
              href={`/midas/profile`}
              className="opacity-60 hover:opacity-100"
            >
              Profile
            </Link>
          </div>

          <div>
            <Link
              href={`/midas/profile/setting`}
              className="opacity-60 hover:opacity-100"
            >
              Setting
            </Link>
          </div>
          <div>
            <Link
              href={`/contact`}
              className="opacity-60 hover:opacity-100"
            >
              Contact
            </Link>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="font-bold text-lg">About</h3>
          <div>
            <Link
              href={`/legale`}
              className="opacity-60 hover:opacity-100"
            >
             Legal
            </Link>
          </div>

          <div>
            <Link
              href={`/term`}
              className="opacity-60 hover:opacity-100"
            >
            Term
            </Link>
          </div>

          <div>
            <Link
              href={`/licence`}
              className="opacity-60 hover:opacity-100"
            >
              Licence
            </Link>
          </div>
        </div>
      </section>

      <section className="container pb-14 text-center">
        <h3>
          &copy; 2024 Made {" "}
          <Link
            href="https://midas-stability.vercel.app/"
            className="text-primary transition-all border-primary hover:border-b-">
            Synergie Mad
          </Link>
        </h3>
      </section>
    </footer>
  );
}

export default Footer;