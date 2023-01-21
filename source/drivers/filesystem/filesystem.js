import utils from '../../utils/utils.js';

const traverse = async ({
  fs,
  root,
}) => {
  const paths = [];
  const candidates = [
    root,
  ];

  for (const candidate of candidates) {
    const isDirectory = (await fs.stat(candidate)).isDirectory();

    if (isDirectory) {
      const files = await fs.readdir(candidate);

      const nextCandidates = files.map((file) => {
        return `${candidate}/${file}`;
      });

      candidates.push(...nextCandidates);
    } else {
      paths.push(candidate);
    }
  }

  return paths;
};

const filesystem = ({
  fs,
}) => {
  return {
    paths: async (root) => {
      try {
        const paths = await traverse({
          fs,
          root,
        });

        return [
          paths,
        ];
      } catch (error) {
        return utils.errors.wrap('paths', error.message);
      }
    },
  };
};

export default filesystem;
