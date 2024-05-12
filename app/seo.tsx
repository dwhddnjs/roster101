import Head from "next/head"
import icon from "../public/images/esport_icon.svg"

export default function Seo({ title }: { title: string }) {
  return (
    <Head>
      <title>{`${title} | lolstar`}</title>
      <meta
        name="description"
        content="당신의 LOL Esports 로스터를 구성해보세요!"
      />
      <meta
        name="keywords"
        content="lolstar, lck, 로스터, 롤선수, 롤구단, 롤스타"
      />
      <meta property="og:title" content="lolstar" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://lolstar.vercel.app/" />
      <meta property="og:image" content={icon} />
    </Head>
  )
}
