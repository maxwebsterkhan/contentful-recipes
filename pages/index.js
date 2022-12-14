import { createClient } from 'contentful';
import RecipesCard from '../components/RecipesCard';

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});

export async function getStaticProps() {
  const res = await client.getEntries({ content_type: 'recipe' });

  return {
    props: { recipes: res.items },
    revalidate: 1,
  };
}

export default function Recipes({ recipes }) {
  console.log(recipes);
  return (
    <div className='recipe-list'>
      {recipes.map((recipe) => (
        <RecipesCard key={recipe.sys.id} recipe={recipe} />
      ))}

      <style jsx>{`
        .recipe-list {
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-gap: 20px 60px;
        }
      `}</style>
    </div>
  );
}
