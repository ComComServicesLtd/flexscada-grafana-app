
import React from 'react';
import {Input, InlineField,  Button, Legend, useStyles2 } from '@grafana/ui';
import { PluginConfigPageProps, AppPluginMeta, PluginMeta, GrafanaTheme2 } from '@grafana/data';
import { getBackendSrv } from '@grafana/runtime';
import { css } from '@emotion/css';
import { lastValueFrom } from 'rxjs';

export type AppPluginSettings = {};

export interface AppConfigProps extends PluginConfigPageProps<AppPluginMeta<AppPluginSettings>> {}

export const AppConfig = ({ plugin }: AppConfigProps) => {
  const s = useStyles2(getStyles);
  const { enabled, secureJsonFields} = plugin.meta;

  let fs_apiKey: string;
  let fs_path: string;


    /*
    <InlineField label="Server Path">
      <Input type="string" onChange={(e) => fs_path = e.currentTarget.value} placeholder="http://127.0.0.1:7001" />
    </InlineField>
    */



  console.log(secureJsonFields);


  return (
    <div className="gf-form-group">
      <div>
        {/* Enable the plugin */}

        {!enabled && (
          <>
                  <Legend>Activate the FlexSCADA Plugin</Legend>




  <InlineField  label="API Key">
    <Input  type="string" onChange={(e) => fs_apiKey = e.currentTarget.value}   placeholder="" />
  </InlineField>



            <div className={s.colorWeak}>The plugin is currently not enabled.</div>
            <Button
              className={s.marginTop}
              variant="primary"
              onClick={() =>
                updatePluginAndReload(plugin.meta.id, {
                  enabled: true,
                  pinned: true,
                  secureJsonData:{apiKey:fs_apiKey,path:fs_path},
                })
              }
            >
              Activate plugin
            </Button>
          </>
        )}

        {/* Disable the plugin */}
        {enabled && (
          <>
           <Legend>The FlexSCADA Plugin is Already Activated</Legend>




            <Button
              className={s.marginTop}
              variant="destructive"
              onClick={() =>
                updatePluginAndReload(plugin.meta.id, {
                  enabled: false,
                  pinned: false,
                  secureJsonData:{apiKey:'',path:''},
                })
              }
            >
              Reset plugin
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

const getStyles = (theme: GrafanaTheme2) => ({
  colorWeak: css`
    color: ${theme.colors.text.secondary};
  `,
  marginTop: css`
    margin-top: ${theme.spacing(3)};
  `,
});

const updatePluginAndReload = async (pluginId: string, data: Partial<PluginMeta>) => {
  try {
    await updatePlugin(pluginId, data);

    // Reloading the page as the changes made here wouldn't be propagated to the actual plugin otherwise.
    // This is not ideal, however unfortunately currently there is no supported way for updating the plugin state.
    window.location.reload();
  } catch (e) {
    console.error('Error while updating the plugin', e);
  }
};

export const updatePlugin = async (pluginId: string, data: Partial<PluginMeta>) => {
  const response = getBackendSrv().fetch({
    url: `/api/plugins/${pluginId}/settings`,
    method: 'POST',
    data,
  });
  return lastValueFrom(response);
};
