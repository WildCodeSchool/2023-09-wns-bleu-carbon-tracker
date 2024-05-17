interface Props {
  search: string;
  children: string;
}

const Highlight = ({ search, children }: Props) => {
  const findIndex = children.toLowerCase().indexOf(search.toLowerCase());
  const beforeMatch = children.slice(0, findIndex);
  const theMatch = children.slice(findIndex, findIndex + search.length);
  const afterMatch = children.slice(findIndex + search.length);

  return search !== '' && findIndex !== -1 ? (
    <>
      {beforeMatch}
      <mark className='bg-light_green'>{theMatch}</mark>
      {afterMatch}
    </>
  ) : (
    <>{children}</>
  );
};

export default Highlight;
