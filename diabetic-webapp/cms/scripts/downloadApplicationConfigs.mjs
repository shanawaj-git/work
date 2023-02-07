import { fetchContent } from './fetchCmsContent.mjs';

fetchContent({
  contentType: 'configs',
  outputDirectory: `app/configs/applicationConfig.json`,
});
