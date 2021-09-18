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
    <div>
      <Accordion>
        <AccordionItem>
          <AccordionTitle>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime, veritatis! Dicta
            tempora assumenda aspernatur, expedita aut quae debitis eius quaerat reiciendis commodi
            aliquid consectetur pariatur, quia in, officia libero minima. Iusto maxime laudantium
            beatae vel ea corrupti eligendi earum, ullam placeat reprehenderit blanditiis omnis,
            neque accusamus. Adipisci numquam fugit unde. Optio, velit. Unde ipsum cupiditate
            consectetur itaque pariatur incidunt obcaecati! Dolore voluptatem quidem officia. Quam,
            facere. Asperiores necessitatibus similique dicta expedita fuga, recusandae eligendi,
            sunt mollitia nemo praesentium alias deserunt doloremque odio. Perferendis sapiente
            tempore ipsam impedit, voluptate vero optio.
          </AccordionTitle>
          <AccordionBody>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Est quo, amet temporibus
            inventore quas adipisci dolore explicabo laboriosam molestiae soluta accusamus,
            reiciendis eius laborum, deserunt quisquam modi suscipit? Aliquam, cumque.
          </AccordionBody>
        </AccordionItem>
        <AccordionItem expanded>
          <AccordionTitle>Accordion 2</AccordionTitle>
          <AccordionBody>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur unde ad eum earum
            ratione autem ullam at harum voluptatum aperiam non deserunt, vero optio porro numquam
            cumque, officia culpa ipsam!
          </AccordionBody>
        </AccordionItem>
        <AccordionItem>
          <AccordionTitle>Accordion 3</AccordionTitle>
          <AccordionBody>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita voluptates delectus
            quibusdam molestias itaque, in velit voluptas maxime non dolor. Culpa fugiat sapiente,
            ipsum quae debitis omnis iste laborum atque. Officia repellendus eligendi unde. Optio
            sed hic veniam corrupti quo dolores, deleniti mollitia tempora, non ipsam minima est
            harum provident cumque impedit! Doloremque consequatur optio ipsam atque eaque
            consectetur facere? Ad fuga eligendi, sint earum impedit corporis, dignissimos labore
            reprehenderit, eius sapiente illum quia est dolor. Eum, asperiores! Laboriosam rem ut
            nam tempora earum inventore nostrum iusto perspiciatis mollitia nisi? Laborum, ducimus.
            Recusandae fuga ut veritatis deserunt consequuntur temporibus! Aut ab quasi odio!
            Distinctio, hic tempora. Praesentium in dolor temporibus incidunt, fuga, illo quaerat
            reiciendis atque quia placeat magnam commodi? Pariatur debitis magni, qui harum a soluta
            sunt officiis laborum et exercitationem. Dolorum provident, saepe minima culpa ullam,
            qui, voluptas ipsam vero praesentium quisquam vel voluptatum magni quibusdam eum
            tempora. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatem veritatis
            quia illo, deleniti repellendus ea libero optio, inventore voluptatibus enim, nesciunt
            perferendis rerum nostrum quaerat. Nostrum molestias a commodi numquam! Corporis
            reiciendis et quisquam quidem similique, veniam quo necessitatibus magni, unde sint nemo
            laudantium. Commodi sunt tempora incidunt, eos ut voluptatem rerum fuga facere enim,
            ullam quas ipsam quam eveniet! Assumenda natus voluptatum mollitia nemo, delectus
            perferendis quae placeat quisquam id accusamus adipisci sunt dolore itaque expedita
            aliquam minima illum dolorum eius cupiditate enim modi quod officia. Officia, et
            veritatis. Illo quia cupiditate quae totam blanditiis rem? Debitis, illum expedita
            consectetur rerum ratione natus nulla libero modi quasi omnis ullam maxime excepturi
            esse perspiciatis aliquid! Veniam neque adipisci odit! Commodi! Iusto facilis minus
            accusamus? Hic quae, nesciunt, culpa neque debitis est accusantium molestias quas
            expedita cumque maxime obcaecati laboriosam autem quis amet, quasi dicta adipisci
            voluptas aliquid. Aspernatur, ipsum saepe.
          </AccordionBody>
        </AccordionItem>
        <AccordionItem>
          <AccordionTitle>Accordion 4</AccordionTitle>
          <AccordionBody>
            Lorem, ipsum dolor. Totam, fuga sint. Exercitationem, dolor veritatis?
          </AccordionBody>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
