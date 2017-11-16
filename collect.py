import inspect
import json
import sys


def tree():
    visited = set()
    to_visit = [('tensorflow', __import__('tensorflow'))]
    to_insert = []

    while len(to_visit) > 0:
        m = to_visit[0]
        del to_visit[0]

        m_name = m[0]
        m_val = m[1]

        if m_val in visited:
            continue
        else:
            visited.add(m[1])

        if hasattr(m_val, '__all__'):
            subs = getattr(m_val, '__all__')
        else:
            subs = dir(m_val)

        for sub in subs:
            if sub.startswith('_'):
                continue

            sub_val = getattr(m_val, sub)
            sub_type = 'v'
            sub_doc = inspect.getdoc(sub_val)
            sub_sig = None
            full_name = f'{m_name}.{sub}'

            if inspect.ismodule(sub_val):
                if sub_val.__name__.startswith('tensorflow'):
                    to_visit.append((full_name, sub_val))
                else:
                    continue
            elif inspect.isfunction(sub_val):
                sub_type = 'f'
                sub_sig = str(inspect.signature(sub_val))
            elif inspect.isclass(sub_val):
                sub_type = 'c'

            to_insert.append({
                'name': full_name.replace('tensorflow.', 'tf.'),
                'type': sub_type,
                'sig': sub_sig,
                'doc': sub_doc})

    print('exports.apis = ', end='')
    json.dump(to_insert, fp=sys.stdout, indent=2)


if __name__ == '__main__':
    tree()
