import utils from '../../utils/utils.js';

const {
  errors,
} = utils;

const filesystem = ({
  fs,
}) => {
  return {
    paths: async (root) => {
      try {
        const paths = [];
        const candidates = [
          root,
        ];

        for (let index = 0; index < candidates.length; index++) {
          const candidate = candidates[index];

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

        return [
          paths,
        ];
      } catch (error) {
        return errors.wrap('paths', error.message);
      }
    },
  };
};

export default filesystem;
