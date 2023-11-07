import * as React from 'react';
import { AppRootProps } from '@grafana/data';

export class App extends React.PureComponent<AppRootProps> {


  render() {
    let base = window.location.pathname.substr(0,window.location.pathname.indexOf('/a/comcomservices'));
  //  let api = base + '/api/plugin-proxy/flexscada-app';
    let app = base + '/public/plugins/flexscada/img/main.html';

    //@ts-ignore
    window.location = app;//app + "?api=" + encodeURI(api);

       return <div className="page-container">Loading...</div>;

  //return (
  //    <iframe className="page-container" width="100%" height="100%" src={app} />
   //     );
  }
}



/*
 * import { AppRootProps } from '@grafana/data';
import React, { FC } from 'react';

export const App: FC<AppRootProps> = ({ query, path, meta }) => {


  return (
    <div>
      <ul>
        <li>
          <a href={path + '?x=1'}>Change query to 1</a>
        </li>
        <li>
          <a href={path + '?x=AAA'}>Change query to AAA</a>
        </li>
        <li>
          <a href={path + '?x=1&y=2&y=3'}>Put multiple properties into the query</a>
        </li>
      </ul>
      <br />
       <pre>{JSON.stringify(window.location)}</pre>



      QUERY: <pre>{JSON.stringify(query)}</pre>
      <br />
      Stored configuration data:
      <pre>{JSON.stringify(meta.jsonData)}</pre>
    </div>
  );
};

*/
