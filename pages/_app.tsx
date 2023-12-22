import '../styles/adg.scss'
import 'highlight.js/styles/monokai.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect } from 'react'

type MenuProps = {
    slug: string;
    title: string;
}


let current_slug: string


const MenuLink = (props: MenuProps) =>
  <li>
    <Link href={"/" + props.slug} className={(props.slug == current_slug ? 'active' : '')}>
      {props.title}
    </Link>
  </li>

const Adg = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
      import('bootstrap/js/dist/collapse')
  }, [])
  current_slug = pageProps.slug == 'index' ? '' : pageProps.slug
  return (
    <div className="wrapper">
      <Head>
        <title>{pageProps.title}</title>
        <meta name="description" content={pageProps.description}/>
        <link rel="icon" href="/favicon.ico"/>
      </Head>
      <header>
        <nav>
          <div>
            <span>
              <button type="button" data-bs-toggle="collapse" data-bs-target="#Navigation" aria-controls="Navigation" aria-expanded="false" aria-label="Toggle navigation">
              </button>
              <Link href="/">
                <img src="/img/adg-logo.png" alt="ADG canvas" width="48" height="48"/>
                <b>ADG cairo canvas</b>
              </Link>
            </span>
            <span>
              <Link href="https://github.com/ntd/adg">
                <img src="/img/github.svg" alt="GitHub" width="32" height="32"/>
              </Link>
            </span>
          </div>
        </nav>
      </header>
      <div>
        <div>
          <aside id="Navigation" className="collapse">
            <ul>
              <MenuLink slug="" title="The ADG canvas"/>
              <MenuLink slug="screenshots" title="Screenshots and hints"/>
              <MenuLink slug="download" title="Download and install"/>
              <MenuLink slug="tutorial" title="Tutorial"/>
              <MenuLink slug="history" title="History"/>
              <MenuLink slug="design" title="Design overview"/>
              <MenuLink slug="strategies" title="Implementation strategies"/>
              <MenuLink slug="technical" title="Technical details"/>
              <MenuLink slug="bindings" title="Language bindings"/>
              <MenuLink slug="demo" title="Online demo"/>
            </ul>
          </aside>
          <main>
            <Component {...pageProps}/>
          </main>
        </div>
      </div>
      <footer>
        Developed by
        <Link href="https://www.entidi.com">
          <img src="/img/entidi.svg" alt="eNTiDi software" width="32" height="32"/>
          eNTiDi software
        </Link>
        Licensed under LGPL 2.1+
      </footer>
    </div>
  )
}

export default Adg
