find ./source -name "*.test.js" | while read fname; do
  node "$fname"
done
