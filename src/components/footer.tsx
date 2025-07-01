"use server"
import { getLocale, getTranslations } from "next-intl/server";
import Link from "next/link";

export const Footer = async () => {
  const t = await getTranslations('Navbar');
  const locale = await getLocale();

  const pages = [
    {
      name: t('Home'),
      link: `/${locale}/`,
    },
    {
      name: t('Explore'),
      link: `/${locale}/nft`,
    },
    {
      name: t('Create'),
      link: `/${locale}/create`,
    },
    {
      name: t("About"),
      link: `/${locale}/about`,
    },
  ];

  const linkProfile = [
    {
      name: t('Profile'),
      link: `/${locale}/profile`,
    },
    {
      name: t('Setting'),
      link: `/${locale}/profile/setting`,
    },
  ]

  const linkLegal = [
    {
      name: t('Legal'),
      link: `/${locale}/about`,
    },
    {
      name: t('TermsOfService'),
      link: `/${locale}/terms`,
    },
    {
      name: t('PrivacyPolicy'),
      link: `/${locale}/privacy`,
    },
  ]

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

        <div className="flex flex-col gap-2 p-4">
          <h3 className="font-bold text-lg">Sommary</h3>
          {pages.map((page) => (
            <div key={page.link}>
              <Link
                href={page.link}
                className="opacity-60 hover:opacity-100"
              >
                {page.name}
              </Link>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-2 p-4">
          <h3 className="font-bold text-lg">User</h3>
          {linkProfile.map((page) => (
            <div key={page.link}>
              <Link
                href={page.link}
                className="opacity-60 hover:opacity-100"
              >
                {page.name}
              </Link>
            </div>
          ))}
          <div>
            <Link
              href={`/contact`}
              className="opacity-60 hover:opacity-100"
            >
              Contact
            </Link>
          </div>
        </div>

        <div className="flex flex-col gap-2 p-4">
          <h3 className="font-bold text-lg">About</h3>
          {linkLegal.map((page) => (
            <div key={page.link}>
              <Link
                href={page.link}
                className="opacity-60 hover:opacity-100"
              >
                {page.name}
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="container pb-14 text-center">
        <h3>
          &copy; 2024 Made {" "}
          <Link
            href="https://riah-market.vercel.app/"
            className="text-primary transition-all border-primary hover:border-b-">
            Synergie Mad
          </Link>
        </h3>
      </section>
    </footer>
  );
}