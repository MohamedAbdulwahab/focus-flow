import { Helmet } from 'react-helmet-async';

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keyword' content={keywords} />
    </Helmet>
  );
};

Meta.defaultProps = {
  title: 'Focus Flow',
  description: 'The all-in-one productivity app',
  keywords: 'productivity, tasks, todos, pomodoro',
};

export default Meta;
