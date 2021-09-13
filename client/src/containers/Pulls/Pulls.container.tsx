import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useMount } from 'react-use';
import { useShallowEqualSelector } from 'modules/hooks';
import { PullsAction } from 'actions';
import { Accordion, AccordionBody, AccordionItem, AccordionTitle } from 'components';
import cl from './Pulls.module.scss';
import clsx from 'clsx';

export default (): JSX.Element => {
  const dispatch = useDispatch();

  const { data } = useShallowEqualSelector(({ pulls }) => ({
    data: pulls.relatedPulls,
  }));

  console.log(data);

  useMount(() => {
    dispatch(PullsAction.getPulls());
  });

  return (
    <div style={{ width: '100%' }}>
      <Accordion>
        <AccordionItem>
          <AccordionTitle>Accordion 1</AccordionTitle>
          <AccordionBody>Body 1</AccordionBody>
        </AccordionItem>
        <AccordionItem expanded>
          <AccordionTitle>Accordion 2</AccordionTitle>
          <AccordionBody>Body 2</AccordionBody>
        </AccordionItem>
        <AccordionItem>
          <AccordionTitle>Accordion 3</AccordionTitle>
          <AccordionBody>Body 3</AccordionBody>
        </AccordionItem>
        <AccordionItem>
          <AccordionTitle>Accordion 4</AccordionTitle>
          <AccordionBody>Body 4</AccordionBody>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
