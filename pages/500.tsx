const ServerErrorPage = (props: { [key: string]: string }) =>
  <div className="contents error">
    <h1>500: SERVER ERROR</h1>
    <p>
      Something went wrong on our side.<br/>
      Please, retry later or <a href="mailto:ntd@entidi.it">contact us</a>.
    </p>
  </div>

export default ServerErrorPage
