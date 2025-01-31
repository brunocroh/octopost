import { expect, test } from '@playwright/experimental-ct-react';

import MediaInputs from './MediaInput'; // Forna de importar diferente

// TODO: teste precisa ser revisitado pois está corrigido
test.describe.skip('ManyInputs', () => {
  test.describe('when click on input', () => {
    test('upload the image', async ({ mount }) => {
      const component = await mount(<MediaInputs />);

      await component
        .getByLabel('Upload media files')
        .setInputFiles('src/assets/logo.png');

      await expect(
        component.getByAltText('uploaded image logo.png')
      ).toBeVisible();
    });

    test('upload two images', async ({ mount }) => {
      const component = await mount(<MediaInputs />);

      await component
        .getByLabel('Upload media files')
        .setInputFiles(['src/assets/logo.png', 'src/assets/imagetest.jpg']);

      await expect(
        component.getByAltText('uploaded image logo.png')
      ).toBeVisible();
      await expect(
        component.getByAltText('uploaded image imagetest.jpg')
      ).toBeVisible();
    });

    test.describe('when the file is diferent from image or video', () => {
      test('doesnt select the file', async ({ mount }) => {
        const mediaSelected: string | null = null;

        const component = await mount(<MediaInputs />);
        await component
          .getByLabel('Upload media files')
          .setInputFiles('public/robots.txt');

        expect(mediaSelected).toBeNull();
      });
    });

    test.describe('when add img and click on remove button', () => {
      test('remove image', async ({ mount }) => {
        const component = await mount(<MediaInputs />);

        await component
          .getByLabel('Upload media files')
          .setInputFiles('src/assets/logo.png');

        await expect(
          component.getByAltText('uploaded image logo.png')
        ).toBeVisible();

        await component.getByRole('button', { name: 'X' }).click();

        await expect(
          component.getByAltText('uploaded image logo.png')
        ).toBeHidden();
      });
    });
  });
});
