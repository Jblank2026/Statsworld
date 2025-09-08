import { Metadata } from 'next';

type ParamsInput = {
  [key: string]: string | string[];
};

type SearchParamsInput = {
  [key: string]: string | string[] | undefined;
};

export type PageProps<
  P extends ParamsInput = ParamsInput,
  S extends SearchParamsInput = SearchParamsInput
> = {
  params: P;
  searchParams: S;
};

export type ClientComponentProps<P extends ParamsInput = ParamsInput> = {
  params: P;
};

export type GenerateMetadata = (props: PageProps) => Metadata | Promise<Metadata>; 