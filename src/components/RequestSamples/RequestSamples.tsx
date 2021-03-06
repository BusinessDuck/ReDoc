import { observer } from 'mobx-react';
import * as React from 'react';
import { Tab, TabList, TabPanel, Tabs, UnderlinedHeader } from '../../common-elements';
import { OperationModel, RedocNormalizedOptions } from '../../services';
import { OptionsContext } from '../OptionsProvider';
import { PayloadSamples } from '../PayloadSamples/PayloadSamples';
import { SourceCodeWithCopy } from '../SourceCode/SourceCode';

export interface RequestSamplesProps {
  operation: OperationModel;
}

@observer
export class RequestSamples extends React.Component<RequestSamplesProps> {
  static contextType = OptionsContext;
  context: RedocNormalizedOptions;
  operation: OperationModel;

  render() {
    const { operation } = this.props;
    const requestBodyContent = operation.requestBody && operation.requestBody.content;
    const hasBodySample = requestBodyContent && requestBodyContent.hasSample;
    const samples = operation.codeSamples;

    const hasSamples = hasBodySample || samples.length > 0;

    return (
      (hasSamples && (
        <div>
          <UnderlinedHeader key="header"> Request Example: </UnderlinedHeader>

          {samples.length > 0 ?
            <Tabs defaultIndex={0}>
              <TabList>
                {hasBodySample && <Tab key="payload"> Payload </Tab>}
                {samples.map(sample => (
                  <Tab key={sample.lang}>
                    {sample.label !== undefined ? sample.label : sample.lang}
                  </Tab>
                ))}
              </TabList>
              {hasBodySample && (
                <TabPanel key="payload">
                  <div>
                    <PayloadSamples content={requestBodyContent!} />
                  </div>
                </TabPanel>
              )}
              {samples.map(sample => (
                <TabPanel key={sample.lang}>
                  <SourceCodeWithCopy lang={sample.lang} source={sample.source} />
                </TabPanel>
              ))}
            </Tabs>
            : <div>
              <PayloadSamples content={requestBodyContent!} />
            </div>
          }
        </div>
      )) ||
      null
    );
  }
}
