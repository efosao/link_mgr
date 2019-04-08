const _ = require('lodash')
const nanoid = require('nanoid')
const linksStore = {}

const getLinksCollById = (collId, filter) => {
  const links = _.get(linksStore, collId, [])
  return links
}

const addLink = (collId, url) => {
  const currentLinks = _.get(linksStore, collId, [])
  const linkObj = { id: nanoid(), url }
  const links = [ linkObj, ...currentLinks ]
  linksStore[collId] = links
  return linkObj
}

const removeLink = (linkId, collId) => {
  const links = _.get(linksStore, collId, [])
    .filter(l => l.id === linkId)
  linksStore[collId] = links
}

module.exports = {
  addLink,
  getLinksCollById,
  removeLink
}
