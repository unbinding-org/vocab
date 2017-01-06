# Design document

- base url: `http://vocab.unbinding.org/upo`
- namespace: upo (Unbinding.org Pali Ontology)


## Classes

#### Internal

`upo:unicode` : unicode version of pali term with diacritics

## Properties

#### External

`rdf:type`
`rdfs:Resource`
`owl:NamedIndividual`
`owl:Class`
`owl:ObjectProperty`

---

- normalized ascii rendering of pali terms as index terms using a variation on the [Velthuis scheme][Velthuis]

|     |      |
| --- | ---- |
|  ā  |  aa  |
|  ī  |  ii  |
|  ū  |  uu  |
|  ṁ  |  'm  |
|  ṇ  |  .n  |
|  ñ  |  ~n  |
|  ṭ  |  .t  |
|  ḍ  |  .d  |
|  ṅ  |  'n  |
|  ḷ  |  .l  |

ie: `http://vocab.unbinding.org/upo#vi~n~naa.na`

---

[Velthuis]: https://en.wikipedia.org/wiki/Pali#Pali_transliteration_on_computers