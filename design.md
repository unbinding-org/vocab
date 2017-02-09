# Design document

- base url: `http://vocab.unbinding.org/upo`
- namespace: upo (Unbinding.org Pali Ontology)

## Serialization formats

- Always output RDF/XML
- Use JSON-LD internally
- Embed data using RDFa in HTML documents

## Pali Transliteration

a variation on the [Velthuis scheme][Velthuis] is used to render pali terms in ascii for use as index term (id)

ie: `http://vocab.unbinding.org/upo/terms#vi~n~naa.na`

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


---

[Velthuis]: https://en.wikipedia.org/wiki/Pali#Pali_transliteration_on_computers