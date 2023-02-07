import React from 'react';
import renderer from 'react-test-renderer';

import Typography, { TypographyType } from '../index';

describe('Typography.js', () => {
  describe('index', () => {
    const testTypo = 'test typo';
    it('Should import callout typo', () => {
      const tree = renderer.create(
        <Typography typographyType={TypographyType.CALL_OUT}>
          {testTypo}
        </Typography>,
      );
      expect(tree).toBeTruthy();
      expect(tree).toMatchSnapshot();
    });

    it('Should import caption typo', () => {
      const tree = renderer.create(
        <Typography typographyType={TypographyType.CAPTION}>
          {testTypo}
        </Typography>,
      );
      expect(tree).toBeTruthy();
      expect(tree).toMatchSnapshot();
    });

    it('Should import foot note typo', () => {
      const tree = renderer.create(
        <Typography typographyType={TypographyType.FOOT_NOTE}>
          {testTypo}
        </Typography>,
      );
      expect(tree).toBeTruthy();
      expect(tree).toMatchSnapshot();
    });

    it('Should import head line typo', () => {
      const tree = renderer.create(
        <Typography typographyType={TypographyType.HEAD_LINE}>
          {testTypo}
        </Typography>,
      );
      expect(tree).toBeTruthy();
      expect(tree).toMatchSnapshot();
    });

    it('Should import large title typo', () => {
      const tree = renderer.create(
        <Typography typographyType={TypographyType.LARGE_TITLE}>
          {testTypo}
        </Typography>,
      );
      expect(tree).toBeTruthy();
      expect(tree).toMatchSnapshot();
    });

    it('Should import subtitile typo', () => {
      const tree = renderer.create(
        <Typography typographyType={TypographyType.SUB_HEAD}>
          {testTypo}
        </Typography>,
      );
      expect(tree).toBeTruthy();
      expect(tree).toMatchSnapshot();
    });

    it('Should import title 1 typo', () => {
      const tree = renderer.create(
        <Typography typographyType={TypographyType.TITLE_1}>
          {testTypo}
        </Typography>,
      );
      expect(tree).toBeTruthy();
      expect(tree).toMatchSnapshot();
    });

    it('Should import title 2 typo', () => {
      const tree = renderer.create(
        <Typography typographyType={TypographyType.TITLE_2}>
          {testTypo}
        </Typography>,
      );
      expect(tree).toBeTruthy();
      expect(tree).toMatchSnapshot();
    });

    it('Should import title 3 typo', () => {
      const tree = renderer.create(
        <Typography typographyType={TypographyType.TITLE_3}>
          {testTypo}
        </Typography>,
      );
      expect(tree).toBeTruthy();
      expect(tree).toMatchSnapshot();
    });
  });
});
