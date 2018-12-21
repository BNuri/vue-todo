module.exports = {
 root: true,
 parserOptions: {
   parser: 'babel-eslint',
   sourceType: 'module'
 },
 env: {
   browser: true,
 },
 plugins: [
   "html",
   "vue",
   "standard"
 ],
 extends: [
   'standard',
   'plugin:vue/strongly-recommended'
 ],
 'rules': {
   'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
   'semi': ['error', 'always'],
 }
}
